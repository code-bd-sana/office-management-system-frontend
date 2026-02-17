import Image from "next/image";

export function FeedbackSingle() {
  return (
    <div className="feedback border border-green-600 rounded-sm p-5 mb-4">
      <div className="user flex items-start gap-3">
        <Image
          src="/user-avatar.png"
          alt="User Avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <p className="text-gray-600 font-semibold text-lg">Mahin R.</p>
          <p className="text-gray-600 mt-1 text-lg leading-relaxed">
            Web Developer
          </p>
        </div>
      </div>

      <div className="tasks mt-6">
        <ol className="mt-6  space-y-2 text-gray-600 ">
          <li className="mb-4 flex items-start">
            <span className="border border-sm border-gray-400 w-7 h-7 p-2 mr-3 flex items-center justify-center">
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
          <li className="mb-4 flex items-start">
            <span className="border border-sm border-gray-400 w-7 h-7 p-2 mr-3 flex items-center justify-center">
              2
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sit tristique ascetur
              faucibus mauris. Elementum tincidunt at viverra et vestibulum
              vulputate quis.
            </p>
          </li>
          <li className="mb-4 flex items-start">
            <span className="border border-sm border-gray-400 w-7 h-7 p-2 mr-3 flex items-center justify-center">
              3
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sit tristique lorem
              viverra velit in lectus nascetur faucibus mauris. Elementum
              tincidunt at viverra et vestibulum vulputate quis.
            </p>
          </li>
          <li className="mb-4 flex items-start">
            <span className="border border-sm border-gray-400 w-7 h-7 p-2 mr-3 flex items-center justify-center">
              4
            </span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </li>
        </ol>
      </div>

      <h2 className="mt-8 text-2xl text-[#044192]">Feedback</h2>
      <p className="text-gray-600 mt-3">
        Lorem ipsum dolor sit amet consectetur. Fames sagittis metus iaculis
        adipiscing egestas arcu amet mi mauris. Vitae aliquet scelerisque sit
        vestibulum in a sed. Eu interdum quis imperdiet amet nulla lobortis
        interdum. Magna pellentesque vulputate ac est lorem leo. Erat ultricies
        consectetur tortor elit. Nunc placerat neque amet fermentum porta
        commodo. Mi vitae congue dui nisi sem. Bibendum sit arcu curabitur urna.
        Velit congue sed ultricies nunc.
      </p>

      <div className="footer mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-600 ">5 minutes ago</p>
        <button className="p-2 w-30 text-base text-white font-sm border border-[#044192] rounded-sm bg-[#044192] mt-2">
          Replay
        </button>
      </div>
    </div>
  );
}
