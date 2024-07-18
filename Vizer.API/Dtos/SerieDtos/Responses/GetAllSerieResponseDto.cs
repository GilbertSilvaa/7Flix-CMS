using Vizer.API.Entities;

namespace Vizer.API.Dtos.SerieDtos.Responses;

sealed public record GetAllSerieResponseDto
{
  public string Id { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public int NumberSeasons { get; set; } = 0;
  public DateTime? DateCreated { get; set; }

  public static GetAllSerieResponseDto FromEntity(Serie serie)
  {
    return new GetAllSerieResponseDto
    {
      Id = serie.Id,
      Title = serie.Title,
      NumberSeasons = serie.NumberSeasons,
      DateCreated = serie.CreateAt
    };
  }
}
