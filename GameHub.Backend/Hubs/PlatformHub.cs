using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.SignalR;

namespace GameHub.Backend.Hubs
{
    [Authorize]
    public class PlatformHub : Hub
    {
        public async Task GetAllGames()
        {
            await Clients.Caller.SendAsync("ReceiveGameList", CreateFakeGameList());
        }



        private List<object> CreateFakeGameList()
        {
            var gameList = new List<object>();
            var random = new Random();
            foreach (var item in new int[10])
            {
                gameList.Add(new
                {
                    id = Guid.NewGuid(),
                    name = "Game " + random.Next(1, 100),
                    creator = "Creator " + random.Next(1, 100)
                });
            }

            return gameList;
        }
    }
}
