import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface ScenarioParameter {
  id: string;
  name: string;
  value: number;
  type: 'base' | 'change';
}

interface ScenarioFormData {
  name: string;
  baseParameters: Omit<ScenarioParameter, 'id' | 'type'>[];
  changeParameters: Omit<ScenarioParameter, 'id' | 'type'>[];
}

interface ScenarioFormProps {
  onSubmit: (data: ScenarioFormData) => void;
  isLoading?: boolean;
  className?: string;
}

/**
 * Form component for creating and editing scenarios
 */
export const ScenarioForm: React.FC<ScenarioFormProps> = ({
  onSubmit,
  isLoading = false,
  className,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ScenarioFormData>({
    defaultValues: {
      name: '',
      baseParameters: [{ name: '', value: 0 }],
      changeParameters: [{ name: '', value: 0 }],
    },
  });

  const {
    fields: baseFields,
    append: appendBase,
    remove: removeBase,
  } = useFieldArray({
    control,
    name: 'baseParameters',
  });

  const {
    fields: changeFields,
    append: appendChange,
    remove: removeChange,
  } = useFieldArray({
    control,
    name: 'changeParameters',
  });

  const handleFormSubmit = (data: ScenarioFormData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={clsx('space-y-6', className)}
    >
      {/* Scenario Name */}
      <div>
        <label
          htmlFor="scenario-name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Scenario Name
        </label>
        <input
          id="scenario-name"
          type="text"
          {...register('name', { required: 'Scenario name is required' })}
          className="input-field"
          placeholder="Enter scenario name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Base Parameters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Base Parameters</h3>
          <button
            type="button"
            onClick={() => appendBase({ name: '', value: 0 })}
            className="btn-ghost text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Parameter
          </button>
        </div>

        <div className="space-y-3">
          {baseFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  {...register(`baseParameters.${index}.name`, {
                    required: 'Parameter name is required',
                  })}
                  placeholder="Parameter name"
                  className="input-field"
                />
                {errors.baseParameters?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.baseParameters[index]?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  step="0.01"
                  {...register(`baseParameters.${index}.value`, {
                    required: 'Value is required',
                    valueAsNumber: true,
                  })}
                  placeholder="Value"
                  className="input-field"
                />
                {errors.baseParameters?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.baseParameters[index]?.value?.message}
                  </p>
                )}
              </div>
              {baseFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBase(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Change Parameters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Change Parameters
          </h3>
          <button
            type="button"
            onClick={() => appendChange({ name: '', value: 0 })}
            className="btn-ghost text-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Change
          </button>
        </div>

        <div className="space-y-3">
          {changeFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  {...register(`changeParameters.${index}.name`, {
                    required: 'Parameter name is required',
                  })}
                  placeholder="Parameter name"
                  className="input-field"
                />
                {errors.changeParameters?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.changeParameters[index]?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  step="0.01"
                  {...register(`changeParameters.${index}.value`, {
                    required: 'Value is required',
                    valueAsNumber: true,
                  })}
                  placeholder="Change value"
                  className="input-field"
                />
                {errors.changeParameters?.[index]?.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.changeParameters[index]?.value?.message}
                  </p>
                )}
              </div>
              {changeFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChange(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={clsx(
            'btn-primary',
            isLoading && 'opacity-50 cursor-not-allowed',
          )}
        >
          {isLoading ? 'Creating Scenario...' : 'Create Scenario'}
        </button>
      </div>
    </form>
  );
};
