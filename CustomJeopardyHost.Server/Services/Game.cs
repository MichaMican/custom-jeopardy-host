using CustomJeopardyHost.Server.Hubs;
using CustomJeopardyHost.Server.Models;
using Microsoft.AspNetCore.SignalR;

namespace CustomJeopardyHost.Server.Services;

public class GameService
{
    private readonly IHubContext<GameHub> _hubContext;
    private GameState _gameState = new();

    public GameService(IHubContext<GameHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public GameState GameState => _gameState;

    public void BroadcastGameState()
    {
        _hubContext.Clients.All.SendAsync("ReceiveGameState", _gameState);
    }

    public async Task SendGameStateToClient(string connectionId)
    {
        await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveGameState", _gameState);
    }
}
