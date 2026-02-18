"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function FeedbackSingle() {
  const [isReplyVisible, setIsReplyVisible] = useState(false);

  return (
    <div className="feedback border border-green-600 rounded-sm p-4 mb-4 sm:p-5">
      <div className="user flex items-start gap-3">
        <Image
          src="/user-avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
          className="rounded-full h-10 w-10 sm:h-[60px] sm:w-[60px]"
        />
        <div>
          <p className="text-gray-600 font-semibold text-base sm:text-lg">
            Mahin R.
          </p>
          <p className="text-gray-600 mt-0.5 text-sm leading-relaxed sm:mt-1 sm:text-lg">
            Web Developer
          </p>
        </div>
      </div>

      <div className="tasks mt-4 sm:mt-6">
        <ol className="mt-4 space-y-2 text-gray-600 text-sm sm:mt-6 sm:text-base">
          <li className="mb-3 flex items-start sm:mb-4">
            <span className="border border-sm border-gray-400 w-6 h-6 p-1.5 mr-2 flex items-center justify-center text-xs sm:w-7 sm:h-7 sm:p-2 sm:mr-3 sm:text-sm">
              1
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sit tristique lorem
              viverra velit in lectus nascetur faucibus mauris. Elementum
              tincidunt at viverra et vestibulum vulputate quis.Sit tristique
              lorem viverra velit in lectus nascetur faucibus mauris. Elementum
              tincidunt at viverra et vestibulum vulputate quis.
            </p>
          </li>
          <li className="mb-3 flex items-start sm:mb-4">
            <span className="border border-sm border-gray-400 w-6 h-6 p-1.5 mr-2 flex items-center justify-center text-xs sm:w-7 sm:h-7 sm:p-2 sm:mr-3 sm:text-sm">
              2
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sit tristique ascetur
              faucibus mauris. Elementum tincidunt at viverra et vestibulum
              vulputate quis.
            </p>
          </li>
          <li className="mb-3 flex items-start sm:mb-4">
            <span className="border border-sm border-gray-400 w-6 h-6 p-1.5 mr-2 flex items-center justify-center text-xs sm:w-7 sm:h-7 sm:p-2 sm:mr-3 sm:text-sm">
              3
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sit tristique lorem
              viverra velit in lectus nascetur faucibus mauris. Elementum
              tincidunt at viverra et vestibulum vulputate quis.
            </p>
          </li>
          <li className="mb-3 flex items-start sm:mb-4">
            <span className="border border-sm border-gray-400 w-6 h-6 p-1.5 mr-2 flex items-center justify-center text-xs sm:w-7 sm:h-7 sm:p-2 sm:mr-3 sm:text-sm">
              4
            </span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </li>
        </ol>
      </div>

      <h2 className="mt-6 text-xl text-[#044192] font-semibold sm:mt-8 sm:text-2xl">
        Feedback
      </h2>
      <p className="text-gray-600 mt-2 text-sm sm:mt-3 sm:text-base">
        Lorem ipsum dolor sit amet consectetur. Fames sagittis metus iaculis
        adipiscing egestas arcu amet mi mauris. Vitae aliquet scelerisque sit
        vestibulum in a sed. Eu interdum quis imperdiet amet nulla lobortis
        interdum. Magna pellentesque vulputate ac est lorem leo. Erat ultricies
        consectetur tortor elit. Nunc placerat neque amet fermentum porta
        commodo. Mi vitae congue dui nisi sem. Bibendum sit arcu curabitur urna.
        Velit congue sed ultricies nunc.
      </p>

      <div className="footer mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-600">5 minutes ago</p>

        <Button
          type="button"
          className="h-9 w-full rounded-xs bg-brand-navy px-6 text-sm font-semibold transition-all hover:bg-brand-navy-dark hover:shadow-md active:scale-[0.98] sm:h-10 sm:w-auto sm:px-8 sm:text-base"
          onClick={() => setIsReplyVisible((prev) => !prev)}
        >
          Replay
        </Button>
      </div>

      {/* Reply Section */}
      {isReplyVisible && (
        <div className="reply mt-6 space-y-4">
          <h2 className="mt-8 text-2xl text-[#044192] font-semibold">Replay</h2>

          <Textarea
            id="message"
            placeholder="Type here..."
            className="w-full h-30 resize-none border-gray-300 rounded-0 bg-white placeholder:text-muted-foreground/50"
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="h-10 rounded-xs bg-brand-navy px-8 text-sm font-semibold transition-all hover:bg-brand-navy-dark hover:shadow-md active:scale-[0.98]"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
