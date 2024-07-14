using Vizer.API.Entities;
using Vizer.API.ValueObjects;

namespace Vizer.API.Dtos.MovieDtos.Responses;

sealed public record GetMovieContentResponseDto
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
  public Video? Video { get; set; }

  public static GetMovieContentResponseDto FromEntity(Movie movie)
  {
    return new GetMovieContentResponseDto
    {
      Id = movie.Id,
      Title = movie.Title,
      Synopsis = movie.Synopsis,
      Category = movie.Category,
      Banner = movie.Banner,
      Poster = movie.Poster,
      ReleaseYear = movie.ReleaseYear,
      Review = movie.Review,
      ParentalRating = movie.ParentalRating,
      Video = movie.Video
    };
  }
}
