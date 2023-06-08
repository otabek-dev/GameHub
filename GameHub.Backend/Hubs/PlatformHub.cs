using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace GameHub.Backend.Hubs
{
    [Authorize]
    public class PlatformHub : Hub
    {
        public async Task GetAllUsers()
        {
            await Clients.All.SendAsync("GetAllUsers", "test send");
        }
    }
}
