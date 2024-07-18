using Vizer.API.Entities;

namespace Vizer.API.Dtos.SerieDtos.Requests;

sealed public record CreateSerieDto
{
  public string Title { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public int ParentalRating { get; set; }
  public int NumberSeasons { get; set; }
  public float Review { get; set; }

  public Serie ToEntity()
  {
    return new Serie
    {
      Title = Title,
      Synopsis = Synopsis,
      Banner = Banner,
      Poster = Poster,
      Review = Review,
      Category = Category,
      ReleaseYear = ReleaseYear,
      NumberSeasons = NumberSeasons,
      ParentalRating = ParentalRating
    };
  }
}
