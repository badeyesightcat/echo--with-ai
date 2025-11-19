import Image from "next/image";

export const ConversationsView = () => {
  return (
    <div className="flex flex-col flex-1 h-full gap-y-4 bg-muted">
      <div className="flex flex-1 items-center justify-center gap-x-2">
        <Image
          alt="logo"
          height={40}
          width={40}
          src={"/logo.svg"}
          className="rounded-full"
        />
        <p className="font-semibold text-lg">echo</p>
      </div>
    </div>
  );
};
