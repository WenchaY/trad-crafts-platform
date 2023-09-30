
class BadRequestError(Exception):
    '''Custom BadRequestError Class'''

    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
