using Vizer.API.Dtos.SerieDtos;
using Vizer.API.Entities;
using Vizer.API.Exceptions;
using Vizer.API.Repositories;

namespace Vizer.API.Services;

public class SerieService
{
  private readonly SerieRepository _repository = new();

  public async Task<IEnumerable<Serie>> Get()
    => await _repository.GetAsync();

  public async Task<Serie?> Get(string id)
  {
    var response = await _repository.GetAsync(id)
      ?? throw new NotFoundException("serie not found");

    return response;
  }

  public async Task Create(CreateSerieDto dto)
    => await _repository.CreateAsync(dto.ToEntity());

}
