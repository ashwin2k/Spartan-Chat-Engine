import logging

logging.basicConfig(filename="./logs/server.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')

logger = logging.getLogger()
