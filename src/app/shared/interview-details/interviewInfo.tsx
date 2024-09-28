import WidgetCard from "@/components/cards/widget-card";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styleInfo from "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark";
import { Title } from "rizzui";

const InterviewInfo = ({ interviewDetails }: any) => {
  const {
    interViewInfo = {},
    interViewer = {},
    candidateInfo = {},
  } = interviewDetails;
  const { output = {}, codeSnippet = "" } = interViewInfo;

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 ">
        <WidgetCard title="Interviewer Details" className="!p-5">
          <div className="flex mb-3">
            <div className="w-[64px] break-all">Name:</div>
            <div className="font-medium capitalize">{interViewer.name}</div>
          </div>
          <div className="flex">
            <div className="w-[64px]">Email:</div>
            <div className="font-medium">{interViewer?.email}</div>
          </div>
        </WidgetCard>
        <WidgetCard title="Candidate Details" className="!p-5">
          <div className="flex mb-3">
            <div className="w-[64px]">Name:</div>
            <div className="ml-4 break-all">{candidateInfo?.name || "--"}</div>
          </div>
        </WidgetCard>
        <WidgetCard title="Interview Info" className="!p-5">
          <div className="flex mb-3">
            <div className="w-[180px]">Programming Language:</div>
            <div className="ml-4">
              {(interViewInfo?.programmingLanguage && (
                <Badge
                  className="capitalize  h-6"
                  variant="flat"
                  // @ts-ignore
                  color="primary"
                >
                  {interViewInfo.programmingLanguage}
                </Badge>
              )) ||
                "--"}
            </div>
          </div>
          <div className="flex mb-3">
            <div className="w-[180px]">Program Status:</div>
            <div className="ml-4">
              {candidateInfo?.name &&
                <Badge
                  className="capitalize  h-6"
                  variant="flat"
                  // @ts-ignore
                  color={output.success ? "success" : "danger"}
                >
                  {output.success ? "Success" : "Failed"}
                </Badge>
                || "--"
              }
            </div>
          </div>
        </WidgetCard>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-6 bg-[#2B2B2B] rounded-md min-h-[400px]">
        {codeSnippet && (
          <div className="my-4 border-r border-white">
            <Title as="h4" className="text-white pl-3">Code Snippet</Title>
            <SyntaxHighlighter
              language={interViewInfo?.programmingLanguage}
              style={styleInfo}
            >
              {codeSnippet}
            </SyntaxHighlighter>
          </div>
        )}
        {codeSnippet && (
          <div className="mt-4 ">
            <Title as="h4" className="text-white">Output</Title>
            {output.output &&
              <SyntaxHighlighter
                //   language={interViewInfo?.programmingLanguage}
                style={styleInfo}
              >
                {output.output}
              </SyntaxHighlighter>
              ||
              <div className="text-white mt-8">-------------</div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewInfo;
