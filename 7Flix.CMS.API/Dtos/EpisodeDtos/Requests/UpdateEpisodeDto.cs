using Vizer.API.Entities;
using Vizer.API.ValueObjects;

namespace Vizer.API.Dtos.EpisodeDtos.Requests;

sealed public record UpdateEpisodeDto
{
  public string Id { get; set; } = string.Empty;
  public string IdSerie { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public int ParentalRating { get; set; }
  public int Number {  get; set; }
  public int Season { get; set; }
  public Video? Video { get; set; }

  public Episode ToEntity()
  {
    return new Episode
    {
      Id = Id,
      Title = Title,
      Synopsis = Synopsis,
      Video = Video,
      Season = Season,
      Banner = Banner,
      Poster = Poster,
      Number = Number,
      ReleaseYear = ReleaseYear,
      ParentalRating = ParentalRating,
      UpdateAt = DateTime.Now
    };
  }
}
