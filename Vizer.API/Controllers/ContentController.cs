using System.Net;
using Microsoft.AspNetCore.Mvc;
using Vizer.API.Services;

namespace Vizer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
sealed public class ContentController : ControllerBase
{
  private readonly ContentService _service = new();

  [HttpGet]
  [Route("Movie")]
  public async Task<IActionResult> GetMovies()
  {
    try
    {
      return Ok(await _service.GetMovies());
    }
    catch (Exception ex)
    {
      return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
    }
  }

  [HttpGet]
  [Route("Serie")]
  public async Task<IActionResult> GetSeries()
  {
    try
    {
      return Ok(await _service.GetSeries());
    }
    catch (Exception ex)
    {
      return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
    }
  }
}
