namespace Vizer.API.Entities;

public abstract class Midia(
  string title,
  string banner,
  string poster,
  string releaseYear,
  int parentalRating) : EntityBase
{

  public string Title { get; set; } = title;
  public string Banner { get; set; } = banner;
  public string Poster { get; set; } = poster;
  public string ReleaseYear { get; set; } = releaseYear;
  public int ParentalRating { get; set; } = parentalRating;
}
