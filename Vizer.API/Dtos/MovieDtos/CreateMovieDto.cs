using Vizer.API.Entities;
using Vizer.API.ValueObjects;

namespace Vizer.API.Dtos.MovieDtos;

public class CreateMovieDto
{
  public string Title { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public int ParentalRating { get; set; }
  public float Review { get; set; }
  public Video? Video { get; set; }

  public Movie ToEntity()
  {
    return new Movie(
      Title, 
      Review, 
      Video, 
      Banner, 
      Poster, 
      Category, 
      ReleaseYear, 
      ParentalRating);
  }
}
