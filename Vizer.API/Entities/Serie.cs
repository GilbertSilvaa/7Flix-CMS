namespace Vizer.API.Entities;

public class Serie(
  string title,
  float review,
  string banner,
  string poster,
  string categoy,
  string releaseYear,
  int parentalRating, 
  int numberEpisodes,
  IEnumerable<Episode> episodes) 
  : Midia(
  title,
  banner,
  poster,
  releaseYear,
  parentalRating)
{
  public string Category { get; set; } = categoy;
  public float Review { get; set; } = review;
  public int NumberEpisodes { get; set; } = numberEpisodes;
  public IEnumerable<Episode> Episodes { get; set; } = episodes;
}
