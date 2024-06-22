using Vizer.API.Entities;

namespace Vizer.API.Dtos.SerieDtos.Responses;

public class GetSerieResponseDto
{
  public string Id { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public float Review { get; set; }
  public int ParentalRating { get; set; }
  public int NumberSeasons { get; set; } = 0;
  public int NumberEpisodes { get; set; } = 0;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public DateTime CreateAt { get; set; }
  public DateTime? UpdateAt { get; set; }

  public static GetSerieResponseDto FromEntity(Serie serie)
  {
    return new GetSerieResponseDto 
    {
      Id = serie.Id,
      Title = serie.Title,
      Category = serie.Category,
      Synopsis = serie.Synopsis,
      ReleaseYear = serie.ReleaseYear,
      Review = serie.Review,
      ParentalRating = serie.ParentalRating,
      NumberSeasons = serie.NumberSeasons,
      NumberEpisodes = serie.Episodes.Count,
      Banner = serie.Banner,
      Poster = serie.Poster,
      CreateAt = serie.CreateAt,
      UpdateAt = serie.UpdateAt
    };
  }
}
