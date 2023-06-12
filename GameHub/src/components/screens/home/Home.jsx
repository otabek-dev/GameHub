import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import style from './Home.module.css';
import GameItem from "./GameItem.jsx";

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

      <div className={style.game_list}>
        {games.map((game) => (
            <GameItem key={game.id} name={game.name} creator={game.creator} id={game.id}/>
        ))}
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