using Microsoft.AspNetCore.Mvc;
using Rectangle_SVG.Server.BLL;
using Rectangle_SVG.Server.DTO;

namespace Rectangle_SVG.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RectangleSVGController(IRectangleSVGService rectangleSVGService) : ControllerBase
{
    private readonly IRectangleSVGService _rectangleSVGService = rectangleSVGService;

    /// <summary>
    /// Gets the initial data of the rectangle SVG asynchronously.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<RectangleDTO>> Get()
    {
        try
        {
            var result = await _rectangleSVGService.GetRectangleDataAsync();
            return Ok(result);
        }
        catch
        {
            return BadRequest("An error occurred during getting the initial dimensions");
        }
    }

    /// <summary>
    /// Updates the dimensions of the rectangle SVG asynchronously.
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] RectangleDTO model)
    {
        try
        {
            await _rectangleSVGService.UpdateRectangleDataAsync(model);
            return Ok();
        }
        catch
        {
            return BadRequest("An error occurred during updating the data");
        }
    }
}
