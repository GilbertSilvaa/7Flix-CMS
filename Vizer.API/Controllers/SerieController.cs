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

  [HttpPut]
  public async Task<IActionResult> Update(UpdateSerieDto dto)
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

  [HttpPost]
  [Route("AddEpisode")]
  public async Task<IActionResult> AddEpisode(CreateEpisodeDto dto)
  {
    try
    {
      await _service.AddEpisode(dto);
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

  [HttpPost]
  [Route("RemoveEpisode")]
  public async Task<IActionResult> RemoveEpisode(RemoveEpisodeDto dto)
  {
    try
    {
      await _service.RemoveEpisode(dto);
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
