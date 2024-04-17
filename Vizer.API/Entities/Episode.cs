using Vizer.API.ValueObjects;

namespace Vizer.API.Entities;

public class Episode(
  int number,
  int season,
  string title,
  Video? video,
  string banner,
  string poster,
  string releaseYear,
  int parentalRating) 
  : Midia(
  title,
  banner,
  poster,
  releaseYear,
  parentalRating)
{
  public int Number { get; set; } = number;
  public int Season { get; set; } = season;
  public Video? Video { get; set; } = video;
}
