import { DefaultService, OpenAPI } from "../vizoApi";

export const SideBar = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    window.location.href = `https://www.facebook.com/v15.0/dialog/oauth?client_id=3796703967222950&redirect_uri=https://bd44-82-69-4-0.ngrok.io/facebook_login/&config_id=728465868571401&state=${token}`;
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
