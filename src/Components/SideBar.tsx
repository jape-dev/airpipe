import { DefaultService, OpenAPI } from "../vizoApi";

export const SideBar = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href =
      "https://www.facebook.com/v15.0/dialog/oauth?client_id=3796703967222950&redirect_uri=https://aefe-2a01-4b00-c004-d500-41b7-6cd9-9c84-69b3.ngrok.io/facebook_login/&state=123456&config_id=728465868571401";
    // const token = localStorage.getItem("token");
    // if (token) {
    //   console.log(token);
    //   OpenAPI.TOKEN = token;
    //   DefaultService.facebookAuthFacebookAuthGet()
    //     .then((response: any) => {
    //       console.log(response);
    //     })
    //     .catch((error: any) => {
    //       console.log(error);
    //     });
    // } else {
    //   // Change this to sign in again or something.
    //   console.log("no token");
    // }
  };

  return (
    <div className="w-full h-full relative p-8 border-2 bg-white border-white border-r-neutral-200">
      <form onSubmit={handleSubmit}>
        <button>Facebook</button>
      </form>
    </div>
  );
};
