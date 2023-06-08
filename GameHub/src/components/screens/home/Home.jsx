const Home = () => {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.location.href = "/login";
    };



    return (
      <div>
        <div>Home</div>
        {<p>{localStorage.getItem("userName")}</p>}
        <button onClick={logout}>logout</button>
      </div>
    );
};

export default Home;