using Vizer.API.Entities;

namespace Vizer.API.Dtos.SerieDtos;

public class GetAllSerieResponseDto
{
  public string Id { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public DateTime? DateCreated { get; set; }

  public static GetAllSerieResponseDto ToEntity(Serie serie)
  {
    return new GetAllSerieResponseDto
    {
      Id = serie.Id,
      Title = serie.Title,
      DateCreated = serie.CreateAt
    };
  }
}
