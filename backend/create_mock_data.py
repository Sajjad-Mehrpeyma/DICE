#!/usr/bin/env python
"""
Create comprehensive mock data for DICE marketing team testing
"""

import os
import sys
import django
from datetime import datetime, timedelta
import random
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.development')
django.setup()

from django.contrib.auth.models import User
from authentication.models import UserProfile
from dashboard.models import KPI, Insight, Metric
from sources.models import DataSource, Document, UploadedFile
from copilot.models import ChatSession, ChatMessage
from scenarios.models import Scenario, SimulationResult

def create_users():
    """Create marketing team users"""
    print("Creating marketing team users...")
    
    users_data = [
        {"username": "sarah.johnson", "email": "sarah.johnson@company.com", "first_name": "Sarah", "last_name": "Johnson", "role": "Marketing Director"},
        {"username": "mike.chen", "email": "mike.chen@company.com", "first_name": "Mike", "last_name": "Chen", "role": "Digital Marketing Manager"},
        {"username": "emma.wilson", "email": "emma.wilson@company.com", "first_name": "Emma", "last_name": "Wilson", "role": "Content Marketing Specialist"},
        {"username": "alex.rodriguez", "email": "alex.rodriguez@company.com", "first_name": "Alex", "last_name": "Rodriguez", "role": "Social Media Manager"},
        {"username": "lisa.patel", "email": "lisa.patel@company.com", "first_name": "Lisa", "last_name": "Patel", "role": "Analytics Specialist"},
    ]
    
    created_users = []
    for user_data in users_data:
        user, created = User.objects.get_or_create(
            username=user_data["username"],
            defaults={
                "email": user_data["email"],
                "first_name": user_data["first_name"],
                "last_name": user_data["last_name"],
                "is_staff": True,
                "is_active": True
            }
        )
        if created:
            user.set_password("password123")
            user.save()
            
            # Create user profile
            UserProfile.objects.create(
                user=user,
                preferences={
                    "theme": "dark",
                    "notifications": True,
                    "role": user_data["role"],
                    "department": "Marketing"
                }
            )
        created_users.append(user)
    
    return created_users

def create_data_sources():
    """Create marketing data sources"""
    print("Creating data sources...")
    
    sources_data = [
        {
            "id": "google_analytics",
            "name": "Google Analytics 4",
            "connector_type": "google_analytics",
            "status": "active",
            "health": "healthy",
            "config": {
                "property_id": "GA4-123456789",
                "api_key": "AIzaSyB...",
                "refresh_token": "1//0G..."
            }
        },
        {
            "id": "facebook_ads",
            "name": "Facebook Ads Manager",
            "connector_type": "facebook_ads",
            "status": "active",
            "health": "healthy",
            "config": {
                "ad_account_id": "act_123456789",
                "access_token": "EAABwzL...",
                "app_id": "123456789012345"
            }
        },
        {
            "id": "google_ads",
            "name": "Google Ads",
            "connector_type": "google_ads",
            "status": "active",
            "health": "healthy",
            "config": {
                "customer_id": "123-456-7890",
                "developer_token": "ABC123...",
                "oauth2_credentials": "ya29.a0..."
            }
        },
        {
            "id": "linkedin_ads",
            "name": "LinkedIn Campaign Manager",
            "connector_type": "linkedin_ads",
            "status": "active",
            "health": "healthy",
            "config": {
                "account_id": "123456789",
                "access_token": "AQV...",
                "organization_id": "12345678"
            }
        },
        {
            "id": "hubspot",
            "name": "HubSpot CRM",
            "connector_type": "hubspot",
            "status": "active",
            "health": "healthy",
            "config": {
                "portal_id": "12345678",
                "api_key": "pat-na1-...",
                "base_url": "https://api.hubapi.com"
            }
        }
    ]
    
    created_sources = []
    for source_data in sources_data:
        source, created = DataSource.objects.get_or_create(
            id=source_data["id"],
            defaults={
                "name": source_data["name"],
                "connector_type": source_data["connector_type"],
                "status": source_data["status"],
                "health": source_data["health"],
                "config": source_data["config"],
                "is_enabled": True,
                "last_sync": datetime.now() - timedelta(hours=random.randint(1, 6))
            }
        )
        created_sources.append(source)
    
    return created_sources

def create_kpis():
    """Create marketing KPIs"""
    print("Creating KPIs...")
    
    kpis_data = [
        {
            "kpi_id": "website_traffic",
            "title": "Website Traffic",
            "category": "Traffic",
            "description": "Total number of website visitors",
            "current_value": "45,230",
            "previous_value": "42,180",
            "change_percent": 7.23,
            "change_type": "increase",
            "unit": "visitors"
        },
        {
            "kpi_id": "conversion_rate",
            "title": "Conversion Rate",
            "category": "Conversion",
            "description": "Percentage of visitors who complete desired action",
            "current_value": "3.2%",
            "previous_value": "2.8%",
            "change_percent": 14.29,
            "change_type": "increase",
            "unit": "percentage"
        },
        {
            "kpi_id": "cost_per_lead",
            "title": "Cost Per Lead (CPL)",
            "category": "Cost",
            "description": "Average cost to acquire one lead",
            "current_value": "$24.50",
            "previous_value": "$28.75",
            "change_percent": -14.78,
            "change_type": "decrease",
            "unit": "USD"
        },
        {
            "kpi_id": "email_open_rate",
            "title": "Email Open Rate",
            "category": "Email",
            "description": "Percentage of emails opened by recipients",
            "current_value": "22.4%",
            "previous_value": "20.1%",
            "change_percent": 11.44,
            "change_type": "increase",
            "unit": "percentage"
        },
        {
            "kpi_id": "social_engagement",
            "title": "Social Media Engagement",
            "category": "Social",
            "description": "Total engagement across all social platforms",
            "current_value": "12,450",
            "previous_value": "10,890",
            "change_percent": 14.33,
            "change_type": "increase",
            "unit": "engagements"
        },
        {
            "kpi_id": "roas",
            "title": "Return on Ad Spend (ROAS)",
            "category": "Revenue",
            "description": "Revenue generated per dollar spent on advertising",
            "current_value": "4.2x",
            "previous_value": "3.8x",
            "change_percent": 10.53,
            "change_type": "increase",
            "unit": "ratio"
        }
    ]
    
    created_kpis = []
    for kpi_data in kpis_data:
        kpi, created = KPI.objects.get_or_create(
            kpi_id=kpi_data["kpi_id"],
            defaults=kpi_data
        )
        created_kpis.append(kpi)
    
    return created_kpis

def create_insights(kpis):
    """Create AI-generated insights for KPIs"""
    print("Creating insights...")
    
    insight_templates = [
        "The {kpi_title} has shown significant improvement this month, indicating that our recent campaign optimizations are working effectively.",
        "Based on the current trend, {kpi_title} is expected to continue growing over the next quarter if we maintain our current strategy.",
        "The increase in {kpi_title} correlates strongly with our recent content marketing efforts, suggesting a direct impact from our blog posts and social media campaigns.",
        "While {kpi_title} is performing well, there's an opportunity to further optimize by focusing on mobile traffic and user experience improvements.",
        "The data shows that {kpi_title} performs best during weekday mornings, indicating optimal timing for our marketing activities.",
        "Our A/B testing results suggest that the new landing page design is contributing to the positive trend in {kpi_title}.",
        "The seasonal pattern in {kpi_title} indicates we should prepare for increased activity during the holiday season.",
        "Cross-channel analysis reveals that {kpi_title} benefits most from integrated campaigns across social media and email marketing."
    ]
    
    for kpi in kpis:
        # Create 2-3 insights per KPI
        num_insights = random.randint(2, 3)
        for i in range(num_insights):
            template = random.choice(insight_templates)
            content = template.format(kpi_title=kpi.title)
            
            Insight.objects.create(
                content=content,
                kpi=kpi,
                generated_at=datetime.now() - timedelta(days=random.randint(1, 30)),
                model_version="gpt-4",
                confidence=round(random.uniform(0.75, 0.95), 2)
            )

def create_metrics(kpis):
    """Create historical metrics data"""
    print("Creating metrics...")
    
    for kpi in kpis:
        # Create 30 days of historical data
        for days_ago in range(30):
            date = datetime.now() - timedelta(days=days_ago)
            
            # Generate realistic metric values based on KPI type
            if "rate" in kpi.kpi_id or "percentage" in kpi.unit:
                base_value = random.uniform(15, 35)
            elif "cost" in kpi.kpi_id or "USD" in kpi.unit:
                base_value = random.uniform(15, 50)
            elif "traffic" in kpi.kpi_id or "visitors" in kpi.unit:
                base_value = random.uniform(20000, 60000)
            elif "engagement" in kpi.kpi_id:
                base_value = random.uniform(8000, 15000)
            else:
                base_value = random.uniform(1, 10)
            
            # Add some trend over time
            trend_factor = 1 + (30 - days_ago) * 0.01
            value = base_value * trend_factor
            
            Metric.objects.create(
                kpi=kpi,
                timestamp=date,
                value=round(value, 2),
                dimensions={
                    "device": random.choice(["desktop", "mobile", "tablet"]),
                    "source": random.choice(["organic", "paid", "social", "email", "direct"]),
                    "campaign": random.choice(["summer_sale", "product_launch", "brand_awareness", "retargeting"]),
                    "region": random.choice(["US", "EU", "APAC", "LATAM"])
                }
            )

def create_documents(sources):
    """Create sample documents"""
    print("Creating documents...")
    
    document_templates = [
        {
            "title": "Q3 Marketing Performance Report",
            "content": "This comprehensive report covers our Q3 marketing performance across all channels. Key highlights include a 15% increase in website traffic and improved conversion rates.",
            "metadata": {"type": "report", "quarter": "Q3", "year": "2024"}
        },
        {
            "title": "Social Media Strategy Guidelines",
            "content": "Our updated social media strategy focuses on engagement, brand awareness, and lead generation. This document outlines best practices for each platform.",
            "metadata": {"type": "strategy", "department": "marketing", "version": "2.1"}
        },
        {
            "title": "Email Marketing Campaign Results",
            "content": "Analysis of our recent email marketing campaigns shows strong performance in open rates and click-through rates. Key learnings and recommendations included.",
            "metadata": {"type": "analysis", "campaign": "summer_2024"}
        },
        {
            "title": "Competitor Analysis - Q4 2024",
            "content": "Detailed analysis of our main competitors' marketing strategies, pricing, and positioning. Identifies opportunities for competitive advantage.",
            "metadata": {"type": "analysis", "quarter": "Q4", "year": "2024"}
        },
        {
            "title": "Customer Journey Mapping",
            "content": "Visual representation of our customer journey from awareness to purchase. Includes touchpoints, pain points, and optimization opportunities.",
            "metadata": {"type": "mapping", "customer_segment": "enterprise"}
        }
    ]
    
    for i, doc_data in enumerate(document_templates):
        source = random.choice(sources)
        Document.objects.create(
            title=doc_data["title"],
            content=doc_data["content"],
            source=source,
            metadata=doc_data["metadata"],
            elasticsearch_id=f"doc_{i+1}_{random.randint(1000, 9999)}"
        )

def create_chat_sessions(users):
    """Create sample chat sessions"""
    print("Creating chat sessions...")
    
    session_topics = [
        "Marketing Campaign Performance Analysis",
        "Q4 Budget Planning Discussion",
        "Social Media Strategy Review",
        "Email Marketing Optimization",
        "Competitor Analysis Insights",
        "Customer Segmentation Strategy",
        "Content Marketing Planning",
        "ROI Analysis and Reporting"
    ]
    
    for i in range(10):
        user = random.choice(users)
        topic = random.choice(session_topics)
        
        session = ChatSession.objects.create(
            title=f"{topic} - Session {i+1}",
            context=f"Discussion about {topic.lower()} with focus on data-driven insights and strategic recommendations.",
            user=user
        )
        
        # Add some messages to each session
        messages = [
            {"role": "user", "content": f"Can you help me analyze our {topic.lower()}?"},
            {"role": "assistant", "content": f"I'd be happy to help you analyze {topic.lower()}. Let me gather the relevant data and insights for you."},
            {"role": "user", "content": "What are the key metrics I should focus on?"},
            {"role": "assistant", "content": "Based on your current data, I recommend focusing on conversion rate, cost per lead, and return on ad spend. These metrics will give you the best insight into campaign effectiveness."},
            {"role": "user", "content": "How can we improve our performance?"},
            {"role": "assistant", "content": "Here are three key recommendations: 1) Optimize your landing pages for mobile, 2) A/B test your ad creatives, and 3) Implement retargeting campaigns for users who didn't convert initially."}
        ]
        
        for j, msg_data in enumerate(messages):
            ChatMessage.objects.create(
                session=session,
                role=msg_data["role"],
                content=msg_data["content"],
                sources=[],
                confidence=0.85 + random.uniform(0, 0.1),
                model_version="gpt-4",
                timestamp=datetime.now() - timedelta(hours=j)
            )

def create_scenarios(users):
    """Create simulation scenarios"""
    print("Creating scenarios...")
    
    scenario_templates = [
        {
            "name": "Increase Ad Budget by 25%",
            "description": "Simulate the impact of increasing our advertising budget by 25% across all channels",
            "parameters": {
                "budget_increase": 0.25,
                "channels": ["google_ads", "facebook_ads", "linkedin_ads"],
                "duration_months": 3
            }
        },
        {
            "name": "Launch New Product Campaign",
            "description": "Simulate the impact of launching a comprehensive campaign for our new product line",
            "parameters": {
                "campaign_type": "product_launch",
                "budget_allocation": {"social": 0.4, "search": 0.3, "display": 0.3},
                "target_audience": "expanded"
            }
        },
        {
            "name": "Optimize Email Marketing",
            "description": "Simulate the impact of implementing advanced email marketing automation and personalization",
            "parameters": {
                "automation_level": "advanced",
                "personalization": True,
                "frequency_increase": 0.2
            }
        },
        {
            "name": "Focus on Mobile Optimization",
            "description": "Simulate the impact of prioritizing mobile-first marketing strategies",
            "parameters": {
                "mobile_priority": True,
                "mobile_budget_shift": 0.3,
                "responsive_design": True
            }
        }
    ]
    
    created_scenarios = []
    for template in scenario_templates:
        user = random.choice(users)
        scenario = Scenario.objects.create(
            name=template["name"],
            description=template["description"],
            parameters=template["parameters"],
            created_by=user
        )
        created_scenarios.append(scenario)
        
        # Create simulation results
        SimulationResult.objects.create(
            scenario=scenario,
            output_metric="conversion_rate",
            original_value=3.2,
            new_value=3.2 + random.uniform(0.5, 1.5),
            impact_percent=random.uniform(15, 35),
            confidence=random.uniform(0.7, 0.9),
            calculated_at=datetime.now(),
            metadata={
                "simulation_id": f"sim_{scenario.id}_{random.randint(1000, 9999)}",
                "model_version": "marketing_sim_v2.1",
                "assumptions": ["current market conditions", "stable competition", "consistent quality scores"]
            }
        )
    
    return created_scenarios

def main():
    """Create all mock data"""
    print("🚀 Creating comprehensive mock data for DICE marketing team...")
    print("=" * 60)
    
    # Create users first
    users = create_users()
    print(f"✅ Created {len(users)} users")
    
    # Create data sources
    sources = create_data_sources()
    print(f"✅ Created {len(sources)} data sources")
    
    # Create KPIs
    kpis = create_kpis()
    print(f"✅ Created {len(kpis)} KPIs")
    
    # Create insights
    create_insights(kpis)
    print(f"✅ Created insights for all KPIs")
    
    # Create metrics
    create_metrics(kpis)
    print(f"✅ Created historical metrics data")
    
    # Create documents
    create_documents(sources)
    print(f"✅ Created sample documents")
    
    # Create chat sessions
    create_chat_sessions(users)
    print(f"✅ Created chat sessions")
    
    # Create scenarios
    scenarios = create_scenarios(users)
    print(f"✅ Created {len(scenarios)} scenarios")
    
    print("=" * 60)
    print("🎉 Mock data creation completed successfully!")
    print("\n📊 Summary:")
    print(f"   • Users: {User.objects.count()}")
    print(f"   • Data Sources: {DataSource.objects.count()}")
    print(f"   • KPIs: {KPI.objects.count()}")
    print(f"   • Insights: {Insight.objects.count()}")
    print(f"   • Metrics: {Metric.objects.count()}")
    print(f"   • Documents: {Document.objects.count()}")
    print(f"   • Chat Sessions: {ChatSession.objects.count()}")
    print(f"   • Scenarios: {Scenario.objects.count()}")
    print("\n🌐 You can now test your APIs and frontend with realistic data!")
    print("   Admin Panel: http://localhost:8000/admin/")
    print("   API Health: http://localhost:8000/api/v1/health/")

if __name__ == "__main__":
    main()
