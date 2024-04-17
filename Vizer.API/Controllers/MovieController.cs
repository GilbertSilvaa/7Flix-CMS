using System.Net;
using Microsoft.AspNetCore.Mvc;
using Vizer.API.Dtos.MovieDtos;
using Vizer.API.Services;

namespace Vizer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MovieController : ControllerBase
{
  private readonly MovieService _service = new();

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

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(string id)
  {
    try
    {
      return Ok(await _service.Get(id));
    }
    catch (Exception ex)
    {
      return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
    }
  }

  [HttpPost]
  public async Task<IActionResult> Create(CreateMovieDto dto)
  {
    try
    {
      await _service.Create(dto);
      return Created();
    }
    catch (Exception ex)
    {
      return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
    }
  }
}
