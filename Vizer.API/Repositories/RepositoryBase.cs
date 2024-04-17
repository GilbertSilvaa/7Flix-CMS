using MongoDB.Driver;
using Vizer.API.Entities;

namespace Vizer.API.Repositories;

public abstract class RepositoryBase<T> where T : EntityBase
{
  private readonly IMongoCollection<T> _collection;

  protected RepositoryBase(string collection)
  {
    MongoClient mongoClient = new(Environment.GetEnvironmentVariable("CONN"));
    var mongoDb = mongoClient.GetDatabase(Environment.GetEnvironmentVariable("DB"));
    _collection = mongoDb.GetCollection<T>(collection);
  }

  public async Task<IEnumerable<T>> GetAsync()
  {
    try
    {
      return await _collection
        .Find(_ => true)
        .ToListAsync();
    }
    catch(Exception ex)
    {
      var message = ex.InnerException?.Message;
      throw new Exception(message ?? ex.Message);
    }
  }

  public async Task<T?> GetAsync(string id)
  {
    try
    {
      return await _collection
        .Find(x => x.Id == id)
        .FirstOrDefaultAsync();
    }
    catch (Exception ex)
    {
      var message = ex.InnerException?.Message;
      throw new Exception(message ?? ex.Message);
    } 
  }

  public async Task CreateAsync(T item)
  {
    try
    {
      await _collection.InsertOneAsync(item);
    }
    catch (Exception ex)
    {
      var message = ex.InnerException?.Message;
      throw new Exception(message ?? ex.Message);
    }
  }

  public async Task UpdateAsync(string id, T item) 
  {
    try
    {
      await _collection.ReplaceOneAsync(x => x.Id == id, item);
    }
    catch (Exception ex)
    {
      var message = ex.InnerException?.Message;
      throw new Exception(message ?? ex.Message);
    }
  }

  public async Task RemoveAsync(string id) 
  {
    try
    {
      await _collection.DeleteOneAsync(x => x.Id == id);
    }
    catch (Exception ex)
    {
      var message = ex.InnerException?.Message;
      throw new Exception(message ?? ex.Message);
    }
  }
}
