namespace Vizer.API.ValueObjects;

public record Video(
  string Url,
  long Duration,
  string StreamFormat
);