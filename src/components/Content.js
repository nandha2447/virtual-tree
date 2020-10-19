import React from "react";
import Typography from "@material-ui/core/Typography";

const Content = ({ data }) => {
  return (
    <>
      {data?.summary && (
        <>
          <Typography variant="h5">Summary</Typography>
          <Typography>{data.summary}</Typography>
          <br />
        </>
      )}
      {data?.objective && (
        <>
          <Typography variant="h5">Objective</Typography>
          <Typography>{data.objective}</Typography>
          <br />
        </>
      )}
      {data?.description && (
        <>
          <Typography variant="h5">Description</Typography>
          <Typography>{data.description}</Typography>
          <br />
        </>
      )}
      {data?.extendedDescription && (
        <>
          <Typography variant="h5">Extended Description</Typography>
          <Typography>
            {typeof data.extendedDescription === "object"
              ? `Extended description of ${data.description}`
              : data.extendedDescription}
          </Typography>
          <br />
        </>
      )}
      {data?.status && (
        <>
          <Typography variant="h5">Status</Typography>
          <Typography>{data.status}</Typography>
          <br />
        </>
      )}
      {data?.submissionDetails && (
        <>
          <Typography variant="h5">Submission Details</Typography>
          <Typography>{`Submission Date: ${data?.submissionDetails.submission_date}`}</Typography>
          <Typography>{`Submission Name: ${data?.submissionDetails.submission_name}`}</Typography>
          {data.submissionDetails.submission_organization && (
            <Typography>{`Submission Organization: ${data?.submissionDetails.submission_organization}`}</Typography>
          )}
        </>
      )}
    </>
  );
};

export default Content;
