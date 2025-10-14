from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
from sentence_transformers import SentenceTransformer
import re
import os


def milvus_text_embedding_pipeline(
    milvus_host: str = "127.0.0.1",
    milvus_port: str = "19530",
    collection_name: str = "sample_text_embeddings",
    model_name: str = "Qwen/Qwen3-Embedding-0.6B",
    text_file_path: str = "../data/sample_text.txt",
    max_length: int = 2048,
    batch_size: int = 16
):
    """
    Functional pipeline up to insertion (Steps 1–7):
        1. Connect to Milvus
        2. Load embedding model
        3. Load text file
        4. Generate embeddings
        5. Create Milvus collection
        6. Insert data
        7. Create index

    Returns
    -------
    model : SentenceTransformer
        Loaded embedding model (for reuse)
    collection : Collection
        Milvus collection object
    """

    # ---------------------------------------------------
    # 1️⃣ Connect to Milvus
    # ---------------------------------------------------
    connections.connect("default", host=milvus_host, port=milvus_port)
    print(f"✅ Connected to Milvus at {milvus_host}:{milvus_port}")

    # ---------------------------------------------------
    # 2️⃣ Load Embedding Model
    # ---------------------------------------------------
    model = SentenceTransformer(model_name)
    print(f"✅ Loaded embedding model: {model_name}")

    # ---------------------------------------------------
    # 3️⃣ Read text file
    # ---------------------------------------------------
    if not os.path.exists(text_file_path):
        raise FileNotFoundError(f"❌ Text file not found: {text_file_path}")

    with open(text_file_path, "r", encoding="utf-8") as f:
        text = " ".join(f.readlines())
        docs = [line[:max_length] for line in re.split(r'\n\s*\n', text.strip()) if len(line.strip()) > 50]
    print(f"📄 Loaded {len(docs)} text segments from {text_file_path}")

    # ---------------------------------------------------
    # 4️⃣ Generate embeddings
    # ---------------------------------------------------
    embeddings = model.encode(docs, batch_size=batch_size, show_progress_bar=True)
    print(f"✅ Generated embeddings with shape: {embeddings.shape}")

    # ---------------------------------------------------
    # 5️⃣ Define or recreate collection
    # ---------------------------------------------------
    if utility.has_collection(collection_name):
        print(f"⚠️ Collection '{collection_name}' exists. Dropping it...")
        utility.drop_collection(collection_name)
        print(f"🗑️ Collection '{collection_name}' dropped.")

    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=embeddings.shape[1]),
        FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=max_length * 3),
    ]

    schema = CollectionSchema(fields, description="Text embeddings using Qwen3 model")
    collection = Collection(name=collection_name, schema=schema)
    print(f"✅ Created Milvus collection: {collection_name}")

    # ---------------------------------------------------
    # 6️⃣ Insert embeddings + text
    # ---------------------------------------------------
    collection.insert([embeddings.tolist(), docs])
    collection.flush()
    print(f"✅ Inserted {len(docs)} records into '{collection_name}'")

    # ---------------------------------------------------
    # 7️⃣ Create index
    # ---------------------------------------------------
    index_params = {
        "metric_type": "IP",
        "index_type": "IVF_FLAT",
        "params": {"nlist": 1024}
    }
    collection.create_index("embedding", index_params)
    print("✅ Index created on 'embedding'")

    return model, collection



# ---------------------------------------------------
# 🔍 8️⃣ 9️⃣ 10️⃣ — Search & Display as separate function
# ---------------------------------------------------
def milvus_search_query(
    model: SentenceTransformer,
    collection: Collection,
    query_text: str,
    top_k: int = 5
):
    """
    Handles search and results display (Steps 8–10):
        8. Load collection into memory
        9. Perform vector search
        10. Display top results
    """

    # ---------------------------------------------------
    # 8️⃣ Load collection
    # ---------------------------------------------------
    collection.load()
    print("✅ Collection loaded into memory")

    print(f"📊 Total entities in collection: {collection.num_entities}")

    # ---------------------------------------------------
    # 9️⃣ Perform vector search
    # ---------------------------------------------------
    query_embedding = model.encode(query_text)
    search_params = {"metric_type": "IP", "params": {"nprobe": 8}}

    results = collection.search(
        data=[query_embedding],
        anns_field="embedding",
        param=search_params,
        limit=top_k,
        output_fields=["text"],
    )

    # ---------------------------------------------------
    # 🔟 Display results
    # ---------------------------------------------------
    print(f"\n🔍 Top {top_k} results for query: '{query_text}'")
    for hits in results:
        for hit in hits:
            print(f"➡ text: {hit.entity.get('text')}")
            print(f"   similarity: {hit.distance:.4f}")
            print("-" * 60)
