﻿using Vizer.API.Entities;
using Vizer.API.ValueObjects;

namespace Vizer.API.Dtos.MovieDtos.Requests;

sealed public record UpdateMovieDto
{
  public string Id { get; set; } = string.Empty;
  public string Synopsis { get; set; } = string.Empty;
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
    return new Movie
    {
      Id = Id,
      Title = Title,
      Synopsis = Synopsis,
      Video = Video,
      Banner = Banner,
      Poster = Poster,
      Review = Review,
      Category = Category,
      ReleaseYear = ReleaseYear,
      ParentalRating = ParentalRating,
      UpdateAt = DateTime.Now
    };
  }
}
