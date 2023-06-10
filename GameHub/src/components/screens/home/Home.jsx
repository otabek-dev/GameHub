import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import style from './Home.module.css';

const GameSearch = ({accessToken, userName}) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Создание и настройка подключения к SignalR Hub

    const hubUrl = 'http://localhost:5216/platformHub';
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => accessToken })
      .withAutomaticReconnect()
      .build();


    // Установка обработчиков событий
    newConnection.on('ReceiveGameList', (gameList) => {
      setGames(gameList);
      console.log(gameList)
    });



    // Запуск подключения
    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);
        newConnection.invoke("GetAllGames").catch((err) => console.error(err));
      })
      .catch((error) => {
        if(error.toString().split(' ').includes('\'401\'')) {
          logout();
        }
      });




    // Отключение при размонтировании компонента
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [accessToken]);

  const searchGame = () => {
    connection.invoke("GetAllGames").catch((err) => console.error(err));
  }

  const handleJoinGame = async () => {
    // Вызов метода сервера для присоединения к выбранной игре
    try {
      await connection.invoke('JoinGame', selectedGame, userName);
      // Дополнительные действия после успешного присоединения
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    window.location.href = "/login";
  };

  return (
    <div className={style.game_hub}>

      <h2 className={style.welcome} >Game<span style={{color: "coral"}}>HUB</span></h2>
      <h4 style={{fontSize: 20, fontWeight: "bold"}}>Welcome, {userName}</h4>

      {/*<select onChange={(e) => setSelectedGame(e.target.value)}>*/}
      {/*  <option value="">Select a game</option>*/}
      {/*  {games.map((game) => (*/}
      {/*    <option key={game.id} value={game.id}>*/}
      {/*      {game.name}*/}
      {/*    </option>*/}
      {/*  ))}*/}
      {/*</select>*/}

      <div className={style.game_list}>
        <div className={style.game}>
          <div className={style.game__content}>
            <span>Tic tac toe</span>
            <div className={style.game__info}>
              <span>Creator: gggg</span>
              <span>Id: #1231412</span>
            </div>
          </div>
          <div className={style.game__btn}>
            <button onClick={handleJoinGame}>Join Game</button>
          </div>
        </div>
      </div>

      <div className={style.game__btn__footer}>
        <button onClick={searchGame}>Info</button>
        <button onClick={searchGame}>Create</button>
        <button onClick={logout}>Logout</button>
      </div>

    </div>
  );
};

export default GameSearch;

// const Home = ({accessToken, userName}) => {
//   const [message, setMessage] = useState("");
//
//   useEffect(() => {
//     // Создание подключения к Hub
//     const connection = new HubConnectionBuilder()
//         .withUrl("http://localhost:5216/platformHub",{ accessTokenFactory: () => accessToken }) // Укажите URL вашего Hub
//         .withAutomaticReconnect()
//         .build();
//
//     // Обработка получения сообщения от Hub
//     connection.on("GetAllUsers", (message) => {
//       setMessage(message);
//     });
//
//     // Запуск подключения к Hub
//     connection.start().then(() => {
//       // Подключение успешно установлено
//       console.log("Connected to PlatformHub");
//
//         // Вызов метода GetAllUsers на Hub
//         connection.invoke("GetAllUsers").catch((err) => console.error(err));
//     });
//
//     // Закрытие подключения при размонтировании компонента
//     return () => {
//       connection.stop().then(() => {
//         console.log("Disconnected from PlatformHub");
//       });
//     };
//   }, [accessToken]);
//
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userName");
//
//     window.location.href = "/login";
//   };
//
//   return (
//       <div>
//         Home
//         {<p>{localStorage.getItem("userName")}</p>}
//         <button onClick={logout}>logout</button>
//         {message}
//         {userName}
//       </div>
//   )
// }
//
// export default Home;