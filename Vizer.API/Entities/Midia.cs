namespace Vizer.API.Entities;

public abstract class Midia: EntityBase
{
  public string Title { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
  public string Banner { get; set; } = string.Empty;
  public string Poster { get; set; } = string.Empty;
  public string ReleaseYear { get; set; } = string.Empty;
  public int ParentalRating { get; set; } 
}
