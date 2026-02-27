using CustomJeopardyHost.Server.Services;
using Microsoft.AspNetCore.SignalR;

namespace CustomJeopardyHost.Server.Hubs;

public class GameHub : Hub
{
    private readonly GameService _gameService;

    public GameHub(GameService gameService)
    {
        _gameService = gameService;
    }

    public override async Task OnConnectedAsync()
    {
        await _gameService.SendGameStateToClient(Context.ConnectionId);
        await base.OnConnectedAsync();
    }
}
