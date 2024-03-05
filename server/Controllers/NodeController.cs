using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.DAL;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NodeController : Controller
{
    private readonly DB _db;
    private readonly ILogger<NodeController> _logger;

    public NodeController(DB db, ILogger<NodeController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Node>>> FetchNodes()
    {
        try
        {
            var nodes = await _db.Nodes.ToListAsync();
            return Ok(nodes);
        }
        catch (Exception e)
        {
            _logger.LogError("[NodeController]: Failed to fetch all nodes: {e}", e.Message);
            return BadRequest("Could not fetch nodes: " + e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> FetchNode(string id)
    {
        try
        {
            var node = await _db.Nodes.FindAsync(id);

            if (node == null)
            {
                throw new Exception("Node with id " + id + " does not exist");
            }

            return Ok(node);
        }
        catch (Exception e)
        {
            _logger.LogError("[NodeController]: Failed to fetch node with id {id}: {e}", id, e.Message);
            return BadRequest("Could not find node: " + e.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateNode(Node node)
    {
        try
        {
            await _db.Nodes.AddAsync(node);
            await _db.SaveChangesAsync();

            return Ok(node);
        }
        catch (Exception e)
        {
            _logger.LogError("[NodeController]: Failed to create node: {e}", e.Message);
            return BadRequest("Could not create node: " + e.Message);
        };
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteNode(string id)
    {
        try
        {
            var node = await _db.Nodes.FindAsync(id);

            if (node == null)
            {
                throw new Exception("Node with id " + id + " does not exist");
            }

            _db.Nodes.Remove(node);
            await _db.SaveChangesAsync();

            return Ok("Node deleted");
        }
        catch (Exception e)
        {
            _logger.LogError("[NodeController]: Failed to delete node with id {id}: {e}", id, e.Message);
            return BadRequest("Could not delete node: " + e.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateNode(Node node)
    {
        try
        {
            _db.Nodes.Update(node);
            await _db.SaveChangesAsync();

            return Ok("Node updated");
        }
        catch (Exception e)
        {
            _logger.LogError("[NodeController]: Failed to update node with id {id}: {e}", node.Id, e.Message);
            return BadRequest("Could not update node: " + e.Message);
        }
    }

}
