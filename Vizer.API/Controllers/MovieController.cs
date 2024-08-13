using System.Net;
using Microsoft.AspNetCore.Mvc;
using Vizer.API.Dtos.MovieDtos.Requests;
using Vizer.API.Exceptions;
using Vizer.API.Services;

namespace Vizer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
sealed public class MovieController : ControllerBase
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

  [HttpPut]
  public async Task<IActionResult> Update(UpdateMovieDto dto)
  {
    try
    {
      await _service.Update(dto);
      return NoContent();
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

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(string id)
  {
    try
    {
      await _service.Delete(id);
      return NoContent();
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
}
