import logging
import sys


class LogLevelFilter(logging.Filter):
    '''ログレベルのフォーマット調整'''

    def __init__(self, max_level=logging.INFO):
        if isinstance(max_level, str):
            max_level = logging.getLevelName(max_level)
        self.max_level = max_level

    def filter(self, record):
        '''ログレベルのフィルター設定用のレベル設定'''
        record.levelname = record.levelname[0].upper()
        return record.levelno <= self.max_level


class LogFormatFilter(logging.Filter):
    '''ログ出力のフォーマット調整'''

    def filter(self, record):
        record.levelname = record.levelname[0].upper()
        return True


def get_logger(name, loglevel="DEBUG"):
    '''ロガー設定'''

    logger = logging.getLogger(name)
    formatter = logging.Formatter(
        "%(asctime)s.%(msecs)03d,%(levelname)s,%(module)s,%(funcName)s,%(message)s",
        "%Y-%m-%dT%H:%M:%S",
    )

    # console handler setting (stdout)
    out_handler = logging.StreamHandler(stream=sys.stdout)
    out_handler.setFormatter(formatter)
    out_handler.addFilter(LogLevelFilter(logging.INFO))

    # console handler setting (stderr)
    err_handler = logging.StreamHandler(stream=sys.stderr)
    err_handler.setLevel(logging.WARNING)
    err_handler.setFormatter(formatter)
    err_handler.addFilter(LogFormatFilter())

    # add the handlers & filter
    logger.addHandler(out_handler)
    logger.addHandler(err_handler)
    logger.setLevel(loglevel)

    return logger
