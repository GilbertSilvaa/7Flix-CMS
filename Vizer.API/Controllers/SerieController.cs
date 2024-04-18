using Microsoft.AspNetCore.Mvc;
using System.Net;
using Vizer.API.Dtos.SerieDtos;
using Vizer.API.Exceptions;
using Vizer.API.Services;

namespace Vizer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SerieController : ControllerBase
{
  private readonly SerieService _service = new();

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
    catch (NotFoundException ex)
    {
      return NotFound(ex.Message);
    }
    catch (Exception ex)
    {
      return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
    }
  }

  [HttpPost]
  public async Task<IActionResult> Create(CreateSerieDto dto)
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
