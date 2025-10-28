import { useState, useEffect } from 'react';
import { BriefTemplate, BriefSection } from '@/data/briefData';
import { X, Save, Download, Loader2, Edit3 } from 'lucide-react';

interface TemplateDrawerProps {
  template: BriefTemplate;
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: () => void;
  onUpdateTemplate: (templateId: number, data: any) => void;
  isGenerating: boolean;
}

const TemplateDrawer = ({
  template,
  isOpen,
  onClose,
  onGenerateReport,
  onUpdateTemplate,
  isGenerating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSections, setEditedSections] = useState<BriefSection[]>(
    template.sections,
  );
  const [editedName, setEditedName] = useState(template.name);
  const [editedDescription, setEditedDescription] = useState(
    template.description,
  );

  useEffect(() => {
    setEditedSections(template.sections);
    setEditedName(template.name);
    setEditedDescription(template.description);
  }, [template]);

  const handleSave = () => {
    const updatedData = {
      name: editedName,
      description: editedDescription,
      sections: editedSections,
    };
    onUpdateTemplate(template.id, updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSections(template.sections);
    setEditedName(template.name);
    setEditedDescription(template.description);
    setIsEditing(false);
  };

  const handleSectionChange = (sectionId: string, content: string) => {
    setEditedSections(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, content } : section,
      ),
    );
  };

  const handleAddSection = () => {
    const newSection: BriefSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      type: 'text',
      content: 'Add your content here...',
      editable: true,
      required: false,
    };
    setEditedSections(prev => [...prev, newSection]);
  };

  const handleRemoveSection = (sectionId: string) => {
    setEditedSections(prev => prev.filter(section => section.id !== sectionId));
  };

  if (!isOpen) return null;

  return (
    <div className="template-drawer">
      <div className="template-drawer__backdrop" onClick={onClose} />
      <div
        className={`template-drawer__content ${isOpen ? 'template-drawer__content--open' : 'template-drawer__content--closed'}`}
      >
        <div className="template-drawer__header">
          <h2 className="template-drawer__title">
            {isEditing ? 'Edit Template' : 'Template Preview'}
          </h2>
          <button
            onClick={onClose}
            className="btn btn--ghost template-drawer__close"
            aria-label="Close template drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="template-drawer__body">
          <div className="template-drawer__preview">
            <h3 className="template-drawer__preview-title">
              Template Information
            </h3>
            <div className="template-drawer__preview-content">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="template-drawer__form-label">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={e => setEditedName(e.target.value)}
                      className="input template-drawer__form-input"
                    />
                  </div>
                  <div>
                    <label className="template-drawer__form-label">
                      Description
                    </label>
                    <textarea
                      value={editedDescription}
                      onChange={e => setEditedDescription(e.target.value)}
                      className="input template-drawer__form-textarea"
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    {template.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      {template.category}
                    </span>
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                      {template.frequency}
                    </span>
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                      {template.sections.length} sections
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="template-drawer__form">
            <h3 className="template-drawer__form-title">Template Sections</h3>

            {editedSections.map((section, index) => (
              <div key={section.id} className="template-drawer__form-group">
                <div className="flex items-center justify-between mb-2">
                  <label className="template-drawer__form-label">
                    Section {index + 1}: {section.title}
                    {section.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSection(section.id)}
                      className="btn btn--ghost btn--sm text-red-500 hover:text-red-700"
                      aria-label={`Remove section: ${section.title}`}
                    >
                      Remove
                    </button>
                  )}
                </div>

                {section.type === 'text' && (
                  <textarea
                    value={section.content}
                    onChange={e =>
                      handleSectionChange(section.id, e.target.value)
                    }
                    className="input template-drawer__form-textarea"
                    rows={4}
                    disabled={!isEditing}
                    placeholder="Enter section content..."
                  />
                )}

                {section.type === 'list' && (
                  <textarea
                    value={section.content}
                    onChange={e =>
                      handleSectionChange(section.id, e.target.value)
                    }
                    className="input template-drawer__form-textarea"
                    rows={4}
                    disabled={!isEditing}
                    placeholder="Enter list items (one per line)..."
                  />
                )}

                {section.type === 'kpi' && (
                  <input
                    type="text"
                    value={section.content}
                    onChange={e =>
                      handleSectionChange(section.id, e.target.value)
                    }
                    className="input template-drawer__form-input"
                    disabled={!isEditing}
                    placeholder="Enter KPI names (comma separated)..."
                  />
                )}

                <div className="flex gap-2 mt-1">
                  <select
                    value={section.type}
                    onChange={e => {
                      const updatedSection = {
                        ...section,
                        type: e.target.value as any,
                      };
                      setEditedSections(prev =>
                        prev.map(s =>
                          s.id === section.id ? updatedSection : s,
                        ),
                      );
                    }}
                    className="input template-drawer__form-select"
                    disabled={!isEditing}
                  >
                    <option value="text">Text</option>
                    <option value="list">List</option>
                    <option value="kpi">KPI</option>
                    <option value="chart">Chart</option>
                    <option value="table">Table</option>
                  </select>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={section.required}
                      onChange={e => {
                        const updatedSection = {
                          ...section,
                          required: e.target.checked,
                        };
                        setEditedSections(prev =>
                          prev.map(s =>
                            s.id === section.id ? updatedSection : s,
                          ),
                        );
                      }}
                      disabled={!isEditing}
                    />
                    Required
                  </label>
                </div>
              </div>
            ))}

            {isEditing && (
              <button
                onClick={handleAddSection}
                className="btn btn--ghost w-full template-drawer__add-section"
              >
                + Add Section
              </button>
            )}
          </div>

          <div className="template-drawer__generate-section">
            <h3 className="template-drawer__generate-title">Generate Report</h3>
            <p className="template-drawer__generate-description">
              Use this template to generate a comprehensive business report with
              current data.
            </p>
            <button
              onClick={onGenerateReport}
              disabled={isGenerating}
              className="btn btn--primary template-drawer__generate-button"
              aria-label="Generate report using this template"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        <div className="template-drawer__actions">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="btn btn--secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn btn--primary">
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn--secondary"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Edit Template
              </button>
              <button
                onClick={onGenerateReport}
                disabled={isGenerating}
                className="btn btn--primary"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-1" />
                    Generate Report
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateDrawer;
