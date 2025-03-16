"""
Mock data for development and testing purposes.
"""

mock_images = [
    {"id": 1, "url": "https://picsum.photos/id/10/200/300", "likes": 5, "dislikes": 2},
    {"id": 2, "url": "https://picsum.photos/id/20/200/300", "likes": 10, "dislikes": 3},
    {"id": 3, "url": "https://picsum.photos/id/30/200/300", "likes": 15, "dislikes": 4},
    {"id": 4, "url": "https://picsum.photos/id/40/200/300", "likes": 20, "dislikes": 5},
    {"id": 5, "url": "https://picsum.photos/id/50/200/300", "likes": 25, "dislikes": 6},
]

class MockSession:
    def __init__(self):
        self.images = mock_images.copy()
        
    def query(self, model):
        return MockQuery(self.images)
        
    def commit(self):
        pass
        
    def close(self):
        pass
        
    def add(self, item):
        if hasattr(item, '__dict__'):
            new_id = len(self.images) + 1
            item_dict = item.__dict__.copy()
            if '_sa_instance_state' in item_dict:
                del item_dict['_sa_instance_state']
            item_dict['id'] = new_id
            self.images.append(item_dict)

class MockQuery:
    def __init__(self, data):
        self.data = data
        
    def all(self):
        from backend.app.models.models import Image
        return [Image(**item) for item in self.data]
        
    def filter(self, condition):
        # Basic filter implementation for id matching
        filtered_data = [item for item in self.data if item['id'] == condition.right.value]
        return MockQuery(filtered_data)
        
    def first(self):
        from backend.app.models.models import Image
        return Image(**self.data[0]) if self.data else None 