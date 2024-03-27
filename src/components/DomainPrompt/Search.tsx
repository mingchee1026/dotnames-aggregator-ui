import { useChat } from "ai/react";
import Link from "next/link";
import { useMemo, useState } from "react";

function Search(): React.JSX.Element {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const [progressBarWidth, setProgressBarWidth] = useState("0%");

  const [domainNames, content] = useMemo(() => {
    const contentFound = messages?.at(-1)?.content || null;

    // Regular expression to match domain names
    const regex = /\d+\.\s([^\n]+)/g;
    // Extract domain names using the regex
    const domainNamesWithIndex =
      !isLoading && messages?.length > 0
        ? messages!?.at(-1)!?.content?.match(regex)
        : [];

    const domainNamesList =
      domainNamesWithIndex!?.length > 0
        ? domainNamesWithIndex!
            ?.map((match) => match.split(". ")[1])
            ?.map((v) => v?.split(".")[0])
        : [];

    return [domainNamesList, contentFound];
  }, [isLoading, messages]);

  const limitInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    if (!input) {
      setProgressBarWidth("0%");
      return;
    }
    const tokens = Math.ceil((input.length + 1) / 4); // Adding 1 to consider the space after the last word
    if (tokens > 25) {
      const allowedInput = input.substring(0, 33 * 4); // Limiting to approximately 33 words
      e.currentTarget.value = allowedInput;
      setProgressBarWidth("100%");
    } else {
      setProgressBarWidth(`${(tokens / 25) * 100}%`);
    }
  };

  return (
    <>
      <button
        className="py-3 px-5 relative left-6  bg-primary z-10 text-white text-xs rounded-3xl"
        type="button"
        onClick={() => {
          (
            document.getElementById("prompt_modal") as HTMLDialogElement
          ).showModal();
        }}
      >
        <div className="flex w-full items-center justify-between ">
          <span>Feeling lucky?</span>
        </div>
      </button>
      <dialog id="prompt_modal" className="modal">
        <div
          className="modal-box"
          style={{
            padding: "0px",
          }}
        >
          <div className="rounded-md text-left">
            <form onSubmit={handleSubmit} className=" w-full sticky top-0 z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="#cbcbcb"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M14 14.0001L11.1 11.1001"
                      stroke="#cbcbcb"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  className="rounded-lg bg-zinc-900 hover:bg-zinc-500 pr-4  p-2 px-3 flex items-center text-white/95 gap-2  leading-4 text-xs duration-300"
                  type="submit"
                >
                  <img src="/images/icons/shine3.gif" className="w-5 h-5" />
                  <span>Generate</span>
                </button>
              </div>
              <input
                autoCorrect="off"
                className="block w-4/5 rounded-t-md border-b border-b-neutral-400 p-4 pl-10 pr-10 text-sm focus:outline-none"
                id="input"
                placeholder="Type a prompt or search..."
                value={input}
                type="text"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                onInput={(e) => {
                  limitInput(e);
                }}
                required
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "lightgrey",
                  borderRadius: "1px",
                }}
              >
                <div
                  style={{
                    width: progressBarWidth,
                    height: "100%",
                    backgroundColor: "#f85888",
                    borderRadius: "1px",
                  }}
                ></div>
              </div>
            </form>
            <div className="p-4">
              {isLoading && (
                <div className="p-4 space-y-2 overflow-scroll">
                  {new Array(5)?.fill(1).map((_, idx) => {
                    return (
                      <div
                        key={`___skeleton_domain_suggested_${idx}`}
                        className="p-2 border border-base-200 rounded-lg w-full h-14 animate-pulse flex items-center justify-between"
                      >
                        <p className="h-7 w-32 bg-gray-400/20 rounded-lg"></p>
                        <p className="h-7 w-7 bg-gray-400/20 rounded-lg"></p>
                      </div>
                    );
                  })}
                </div>
              )}
              {domainNames?.length > 0 &&
                content &&
                domainNames!?.length > 0 && (
                  <div className="p-4 space-y-2">
                    {domainNames?.map((v) => {
                      return (
                        <div
                          key={`___domain_suggested_${v}`}
                          className="p-2 border border-base-200 rounded-lg w-full h-14  flex items-center justify-between px-5"
                        >
                          <p className="h-7 w-32 rounded-lg capitalize">{v}</p>
                          <Link
                            href={`/domains/${v?.trim()?.toLowerCase()}`}
                            className="btn btn-square btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              {!isLoading && content && domainNames?.length <= 0 && (
                <div className="flex flex-wrap p-4">
                  Oh, what a surprise! Absolutely no suggestions found. You
                  might want to give it another go!
                </div>
              )}
            </div>

            {/* <div className="flex flex-wrap p-4">
              {messages?.length > 0 &&
                [messages.at(-1)].map((m) => (
                  <div key={m.id}>
                    <p
                      className={`${
                        m.role === "user" ? "text-blue-500" : "text-[#f85888]"
                      }`}
                    >
                      {m.role === "user" ? "You: " : "DotNames: "}
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: m.content }}></p>
                  </div>
                ))}
            </div> */}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default Search;
