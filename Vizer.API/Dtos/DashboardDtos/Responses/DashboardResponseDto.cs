namespace Vizer.API.Dtos.DashboardDtos.Responses;

public record class DashboardResponseDto (
  int MoviesCount,
  int SeriesCount,
  int EpisodesCount,
  int VodCount
);
