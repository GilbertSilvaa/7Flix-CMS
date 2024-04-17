using Vizer.API.ValueObjects;

namespace Vizer.API.Entities;

public class Movie(
  string title,
  float review,
  Video? video,
  string banner,
  string poster,
  string category,
  string releaseYear,
  int parentalRating) 
  : Midia(
  title, 
  banner, 
  poster, 
  releaseYear, 
  parentalRating)
{
  public string Category { get; set; } = category;
  public float Review { get; set; } = review;
  public Video? Video { get; set; } = video;
}
