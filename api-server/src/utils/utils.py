
def check_none(*args) -> bool:
    """
    パラメータにNoneを検証

    Args:
        *args: 検証するパラメータ

    Returns:
        bool: パラメータに1つがNoneの場合、return True. 
                1つも無かったら、return False.
    """
    return any(arg is None for arg in args)
