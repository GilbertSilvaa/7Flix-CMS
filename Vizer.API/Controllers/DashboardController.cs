using System.Net;
using Microsoft.AspNetCore.Mvc;
using Vizer.API.Services;
namespace Vizer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
  private readonly DashboardService _service = new();

  [HttpGet]
  public async Task<IActionResult> Get()
  {
    try
    {
      return Ok(await _service.Get());
    }
    catch (Exception ex)
    {
      return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
    }
  }
}
