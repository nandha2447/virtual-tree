import { initialData } from "./initialData";

const { Weaknesses, Categories, Views } = initialData.Weakness_Catalog;

export const viewId = Views.View._ID;
export const viewName = Views.View._Name;
export const viewObjective = Views.View.Objective;
export const viewSubmissionDetails = {
  submission_date: Views.View.Content_History.Submission.Submission_Date,
  submission_name: Views.View.Content_History.Submission.Submission_Name,
  submission_organization:
    Views.View.Content_History.Submission.Submission_Organization,
};

const viewMemberIds = Views.View.Members.Has_Member.filter(
  (item) => item._View_ID === viewId
).map((item) => item._CWE_ID);

const normalizedWeaknesses = {};
Weaknesses.Weakness.forEach(
  (weakness) => (normalizedWeaknesses[weakness._ID] = weakness)
);

const normalizedCategories = {};
Categories.Category.forEach(
  (category) => (normalizedCategories[category._ID] = category)
);

export const viewCategories = viewMemberIds.map(
  (member) => normalizedCategories[member]
);

export const weaknessDefinition =
  "Base - a weakness that is still mostly independent of a resource or technology, but with sufficient details to provide specific methods for detection and prevention. Base level weaknesses typically describe issues in terms of 2 or 3 of the following dimensions: behavior, property, technology, language and resource";
export const categoryDefinition =
  "Category - a CWE entry that contains a set of other entries that share a common characteristic";

export const getTreeChildren = (viewCategories) => {
  const categoryTreeObjects = viewCategories.map((category) => {
    const members = category.Relationships.Has_Member;
    const content = {
      summary: category.Summary,
      submissionDetails: {
        submission_date: category?.Content_History?.Submission?.Submission_Date,
        submission_name: category?.Content_History?.Submission?.Submission_Name,
        submission_organization:
          category?.Content_History?.Submission?.Submission_Organization,
      },
    };
    let children;
    if (Array.isArray(members)) {
      const categoryMemberIds = members
        .filter((obj) => obj._View_ID === viewId)
        .map((obj) => obj._CWE_ID);
      const weaknessTreeObjects = categoryMemberIds.map((member) => {
        const weakness = normalizedWeaknesses[member];
        return {
          id: weakness._ID,
          label: weakness._Name,
          children: new Map(),
          content: {
            status: weakness._Status,
            description: weakness.Description,
            extendedDescription: weakness.Extended_Description,
            submissionDetails: {
              submission_name:
                weakness?.Content_History?.Submission?.Submission_Name,
              submission_date:
                weakness?.Content_History?.Submission?.Submission_Date,
              submission_organization:
                weakness?.Content_History?.Submission?.Submission_Organization,
            },
          },
        };
      });
      children = new Map(weaknessTreeObjects.map((obj) => [obj.id, obj]));
    }
    return {
      id: category._ID,
      label: category._Name,
      children,
      content,
    };
  });

  const categoryChildren = new Map(
    categoryTreeObjects.map((obj) => [obj.id, obj])
  );
  return categoryChildren;
};

export { normalizedWeaknesses, normalizedCategories };
