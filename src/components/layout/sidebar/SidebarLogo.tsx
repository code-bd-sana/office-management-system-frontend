import Image from "next/image";

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-4 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full">
        <Image
          src="/logo.png"
          alt="FB International BD"
          width={24}
          height={24}
          className="h-8 w-8 object-contain"
        />
      </div>
      <span className="text-base font-semibold tracking-wide text-white">
        FB International BD
      </span>
    </div>
  );
}
