using Vizer.API.Entities;

namespace Vizer.API.Dtos.SerieDtos.Responses;

sealed public record GetSerieContentResponseDto
{
  public string Id { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public int ParentalRating { get; set; }
  public float Review { get; set; }
  public int NumberSeasons { get; set; }

  public static GetSerieContentResponseDto FromEntity(Serie serie)
  {
    return new GetSerieContentResponseDto
    {
      Id = serie.Id,
      Title = serie.Title,
      Synopsis = serie.Synopsis,
      Category = serie.Category,
      Banner = serie.Banner,
      Poster = serie.Poster,
      ReleaseYear = serie.ReleaseYear,
      ParentalRating = serie.ParentalRating,
      Review = serie.Review,
      NumberSeasons = serie.NumberSeasons
    };
  }
}
