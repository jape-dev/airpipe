import { DefaultService } from "../vizoApi";

export const SideBar = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DefaultService.facebookAuthFacebookAuthGet().then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="w-full h-full relative p-8 border-2 bg-white border-white border-r-neutral-200">
      <form onSubmit={handleSubmit}>
        <button>Facebook</button>
      </form>
    </div>
  );
};
