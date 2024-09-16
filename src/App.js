import { Helmet } from "react-helmet";

function App() {
  return (
    <>

      <Helmet>
        <title>Dream Movie</title>
      </Helmet>
      <div
        style={{
          backgroundImage: "url(/assets/images/background.webp)",
          height: "100vh !important"
        }}
        className="w-100 d-flex justify-content-center image_Background">

        <div
          className=" d-flex flex-wrap fw-bold fs-2 justify-content-center align-items-center pb-5 text-danger"
          style={{ background: "rgb(118 212 252 / 62%)", borderRadius: "8px" }}
        >
          <div className="text-center w-100 mt-5">
            <img src="/assets/images/logo.png" width={100} alt="logo" className="rounded-circle" />
          </div>
          <div className=" text-center">
            Hello! We are Dream Movie
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
